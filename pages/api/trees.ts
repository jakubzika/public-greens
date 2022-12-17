// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tree } from '../../app/types';
import clientPromise from '../../app/_mongo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tree[]>
) {
  const client = await clientPromise;
  const db = client.db("greens")  
  const trees = db.collection('trees');

  let query:any = {}
  if(req.query.street != "") {
    query = {street: req.query.street}
  }

  (await trees.find(query)).toArray((err: any, trees: Tree[]) => {
    res.status(200).json(trees)
  })
}
