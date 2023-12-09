import type { NextApiRequest, NextApiResponse } from 'next/types'
import { Client } from '@notionhq/client'

const notionSecret = process.env.NOTION_SECRET
const notionDatabaseId = process.env.NOTION_DATABASE_TRANSACTIONS_ID

const notion = new Client({ auth: notionSecret })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!notionSecret || !notionDatabaseId) throw new Error('Missing notion secret or database id')

  const query = await notion.databases.query({ database_id: notionDatabaseId })

  console.log(query.results)

  res.status(200).json(query.results)
}
