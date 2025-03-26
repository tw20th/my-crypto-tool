// components/Portfolio/PortfolioChartFilter.tsx

type FilterType = 'all' | '30days' | '7days'

type Props = {
  filter: FilterType
  setFilter: (value: FilterType) => void
}

export default function PortfolioChartFilter({ filter, setFilter }: Props) {
  return (
    <div>
      <label className="font-semibold mr-2">表示期間:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as FilterType)}
        className="border px-2 py-1 rounded"
      >
        <option value="all">全期間</option>
        <option value="30days">過去30日</option>
        <option value="7days">過去7日</option>
      </select>
    </div>
  )
}
