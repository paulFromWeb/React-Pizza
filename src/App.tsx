import './scss/app.scss';
import Home from './components/pages/Home';
import { Routes, Route } from 'react-router-dom';
import MainLayer from './components/MainLayer';
import React, { Suspense } from 'react';
const NotFound = React.lazy(
  () =>
    import(/* webpackChunkName: "[NotFound]" */ './components/pages/NotFound')
);
const Cart = React.lazy(
  () => import(/* webpackChunkName: "[Cart]" */ './components/pages/Cart')
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "[FullPizza]" */ './components/FullPizza')
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayer />}>
        <Route path="" element={<Home />} />

        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
