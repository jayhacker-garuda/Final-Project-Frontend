import React from 'react'
import { useAppContext } from '../context/appContext'

import Hero from '../components/Hero';
import RecentJourney from '../components/RecentJourney';
import Social from '../components/Social';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'User',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Shamar Stewart',
    title: 'Customer Service Representative',
    role: 'Admin',
    email: 'shamarstewart@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]
function Home() {
  const { user } = useAppContext();
  return (
    <div key='Home'>
      <Hero key='Hero' />
      <div className="container mx-auto pt-10 pb-5">
        <RecentJourney
          people={people}
        />
      </div>
      <Social />
    </div>
  )
}

export default Home