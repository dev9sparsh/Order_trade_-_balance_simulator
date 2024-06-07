import { useState, useEffect } from 'react';

const useWebSocket = (pair, resolution, setBidAsk, setCandle, setCurrentPrice) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let pingIntervalOrderBook;
    let pingIntervalCandles;

    const connectWebSocket = () => {
      const ws = new WebSocket("wss://trade.cex.io/api/spot/ws-public");

      ws.onopen = () => {
        const orderBookMessage = {
          e: "get_order_book",
          oid: `${Date.now()}unique_get_order_book`,
          data: { pair },
        };

        const candleMessage = {
          e: "get_candles",
          oid: `${Date.now()}unique_get_candles`,
          ok: "ok",
          data: {
            pair,
            fromISO: Date.now() - resolution?.iso * 60 * 1000,
            limit: 60,
            dataType: "bestAsk",
            resolution: resolution?.resolution,
          },
        };

        ws.send(JSON.stringify(orderBookMessage));
        ws.send(JSON.stringify(candleMessage));

        pingIntervalOrderBook = setInterval(() => {
          ws.send(JSON.stringify(orderBookMessage));
          ws.send(JSON.stringify(candleMessage));
        }, 10100);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.e === "get_order_book") {
          setBidAsk(data.data);
        } else if (data.e === "get_candles") {
          setCandle(data.data);
          setCurrentPrice(data?.data?.[data?.data?.length - 1]?.open);
        }
       
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event) => {
       
        if (pingIntervalOrderBook) clearInterval(pingIntervalOrderBook);
        if (pingIntervalCandles) clearInterval(pingIntervalCandles);
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
      if (pingIntervalOrderBook) clearInterval(pingIntervalOrderBook);
      if (pingIntervalCandles) clearInterval(pingIntervalCandles);
    };
    // eslint-disable-next-line
  }, [pair, resolution]);

  return socket;
};

export default useWebSocket;
