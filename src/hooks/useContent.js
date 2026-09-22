// Fetch published content from Supabase, falling back to the bundled
// static data when Supabase isn't configured or has no rows yet.

import { useEffect, useState } from 'react'
import { supabase, supabaseReady } from '../lib/supabase.js'

export function useTable(table, { orderBy = 'sort_order', fallback = [] } = {}) {
  const [rows, setRows] = useState(fallback)

  useEffect(() => {
    if (!supabaseReady) return
    let cancelled = false
    supabase
      .from(table)
      .select('*')
      .eq('status', 'published')
      .order(orderBy, { ascending: true })
      .then(({ data, error }) => {
        if (!cancelled && !error && data?.length) setRows(data)
      })
    return () => {
      cancelled = true
    }
  }, [table, orderBy])

  return rows
}

export function useSingleton(table, fallback) {
  const [row, setRow] = useState(fallback)

  useEffect(() => {
    if (!supabaseReady) return
    let cancelled = false
    supabase
      .from(table)
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data, error }) => {
        if (!cancelled && !error && data) setRow(data)
      })
    return () => {
      cancelled = true
    }
  }, [table])

  return row
}
