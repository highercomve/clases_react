import React, { useState, useEffect } from 'react';
import * as service from '../../service';// los servicios no van en mayusculas

export default function TopNews () {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    service.getRedditTop().then((response) => {
      setNews(response.data.children) 
      setLoading(false) 
    })
  }, [])

  if (loading === true) {
    return (
      <h1>Cargando...</h1>
    )
  }

  return (
    <section className="todo-list">
      {news.map((n) => (
        <h1 key={n.data.name}>{n.data.title}</h1>
      ))}
    </section>
  )
}
