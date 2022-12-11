import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

const API_URL = 'https://api.logsnag.com/v1/log';
const PROJECT_NAME = 'railtrack';

const messagesToBeSent = ['First one', 'Second one', 'Third one', 'Fourth one'];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    messagesToBeSent.forEach((message) => {
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
      });
    });

    res.status(200).json({ message: 'Sent requests successfully' });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
