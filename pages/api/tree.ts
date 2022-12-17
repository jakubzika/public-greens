// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectID } from 'bson';
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../app/_mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = await clientPromise;
  const db = client.db("greens")
  const trees = db.collection('trees');

  let body = JSON.parse(req.body)
  if (req.method == 'PUT') {
      body._id = new ObjectID(body._id)

      await trees.replaceOne(
        { _id: new ObjectID(body._id) },
        body
      )
      res.status(200).json({})
      
  } else if (req.method == 'POST') {
    await trees.insertOne(body)
    res.status(200).json({})
  } else if (req.method == 'DELETE') {
    const { _id } = body;
    await trees.remove({ _id: new ObjectID(_id) }, { justOne: true })
    res.status(200).json({})
  }
}
