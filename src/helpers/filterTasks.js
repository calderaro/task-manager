
const durationFilters = {
  'all': () => true,
  'short': t => (t <= 30 * 60 * 1000),
  'medium': t => (t >= 30 * 60 * 1000 && t <= 60 * 60 * 1000),
  'large': t => (t >= 60 * 60 * 1000)
}

export default function filterTasks ({list, statusFilter, durationFilter}) {
  return list.filter(({status, duration}) => (status === statusFilter && durationFilters[durationFilter](duration)))
}
