export default defineEventHandler((event) => {
  const { search } = getRouterParams(event)
  return `Hello! ${search}`
});
