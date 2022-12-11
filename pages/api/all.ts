import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

const API_URL = 'https://api.logsnag.com/v1/log';
const PROJECT_NAME = 'railtrack';

const messagesToBeSent = ['First one', 'Second one', 'Third one', 'Fourth one'];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const allMessages = messagesToBeSent.map((message) =>
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.LOGSNAG_TOKEN}`,
          },
          body: JSON.stringify({
            project: PROJECT_NAME,
            channel: 'testing',
            event: 'Test event',
            description: message,
          }),
        })
      );

      await Promise.all(allMessages);

      res.status(200).json({ message: 'Sent requests successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Unable to send requests' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
