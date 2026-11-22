import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/storeContext'
import { CATEGORIES, CONDITIONS, PRODUCTS } from '../data/products'
import type { CategoryId, Condition } from '../data/products'

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating'
type PriceBand = 'any' | 'u10k' | '10-25k' | '25-50k' | '50k+'

const PRICE_BANDS: { id: PriceBand; label: string; test: (n: number) => boolean }[] = [
  { id: 'any', label: 'Any price', test: () => true },
  { id: 'u10k', label: 'Under ₱10,000', test: (n) => n < 10000 },
  { id: '10-25k', label: '₱10,000 – ₱25,000', test: (n) => n >= 10000 && n <= 25000 },
  { id: '25-50k', label: '₱25,000 – ₱50,000', test: (n) => n > 25000 && n <= 50000 },
  { id: '50k+', label: '₱50,000+', test: (n) => n > 50000 },
]

export function Shop() {
  const { query, setQuery } = useStore()
  const [params, setParams] = useSearchParams()
  const [conditions, setConditions] = useState<Condition[]>([])
  const [band, setBand] = useState<PriceBand>('any')
  const [sort, setSort] = useState<Sort>('featured')

  // The category lives in the URL (?category=guitars) so links from the home page and footer work.
  const raw = params.get('category')
  const category: CategoryId | 'all' = CATEGORIES.some((c) => c.id === raw) ? (raw as CategoryId) : 'all'
  const setCategory = (c: CategoryId | 'all') => setParams(c === 'all' ? {} : { category: c })

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const test = PRICE_BANDS.find((b) => b.id === band)!.test
    const list = PRODUCTS.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (conditions.length === 0 || conditions.includes(p.condition)) &&
        test(p.price) &&
        (!q || `${p.name} ${p.brand} ${p.category} ${p.seller}`.toLowerCase().includes(q)),
    )
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [query, category, conditions, band, sort])

  const toggleCondition = (c: Condition) =>
    setConditions((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]))
  const clearFilters = () => {
    setQuery('')
    setParams({})
    setConditions([])
    setBand('any')
  }

  return (
    <section className="wrap section" id="shop">
      <div className="section__head">
        <h2>{category === 'all' ? 'Shop all gear' : CATEGORIES.find((c) => c.id === category)?.label}</h2>
        <label className="sort">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      <div className="shop">
        <aside className="filters">
          <h3>Category</h3>
          <label className="check">
            <input type="radio" name="cat" checked={category === 'all'} onChange={() => setCategory('all')} /> All
          </label>
          {CATEGORIES.map((c) => (
            <label key={c.id} className="check">
              <input type="radio" name="cat" checked={category === c.id} onChange={() => setCategory(c.id)} /> {c.label}
            </label>
          ))}
          <h3>Condition</h3>
          {CONDITIONS.map((c) => (
            <label key={c} className="check">
              <input type="checkbox" checked={conditions.includes(c)} onChange={() => toggleCondition(c)} /> {c}
            </label>
          ))}
          <h3>Price</h3>
          {PRICE_BANDS.map((b) => (
            <label key={b.id} className="check">
              <input type="radio" name="price" checked={band === b.id} onChange={() => setBand(b.id)} /> {b.label}
            </label>
          ))}
          <button className="link" onClick={clearFilters}>
            Clear all filters
          </button>
        </aside>

        <div>
          <p className="count">
            {results.length} {results.length === 1 ? 'listing' : 'listings'}
          </p>
          {results.length === 0 ? (
            <div className="none">
              <h3>No gear matches those filters</h3>
              <p>Try removing a filter or searching for something else.</p>
              <button className="btn" onClick={clearFilters}>
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid--3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
