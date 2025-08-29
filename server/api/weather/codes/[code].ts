import data from './descriptions.json' assert {type: 'json'}

export default defineEventHandler(async (event) => {
  const code: string | undefined = getRouterParam(event, 'code');
  return code ? data[code as keyof typeof data] : undefined
})
