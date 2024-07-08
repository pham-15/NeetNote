import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import ShowNote from './pages/ShowNote';
import EditNote from './pages/EditNote';
import DeleteBook from './pages/DeleteNote'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/notes/create' element={<CreateNote />}/>
      <Route path='notes/details/:id' element={<ShowNote />}/>
      <Route path='notes/edit/:id' element={<EditNote />}/>
      <Route path='notes/delete/:id' element={<DeleteBook />}/>
    </Routes>
  )
}

export default App