import React from 'react'
import Search from './components/Search'
const App = () => {
  return (
    <main>

      <div className = "pattern" />
      
      <div className = "wrapper">
        <header>
          <img src = "./paint.png" alt = "paint" />


          <h1>
            Find <span className="text-gradient">Movies
</span> You Love
          </h1>
        </header>

        <Search />

      </div>

    </main>
  )
}

export default App