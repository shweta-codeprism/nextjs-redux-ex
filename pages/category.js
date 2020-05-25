import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

/** Actions */
import { fetchCategories } from '@reducers/categoryReducer';

/** Semnatic Component */
import { Card } from 'semantic-ui-react';

/** Other Components */
import Loader from '@components/Loader';
import ScreenContentLayout from '@components/ScreenContentLayout';
import CategoryCard from '@components/Categories/CategoryCard';
import AddCategory from '@components/Categories/AddCategory';

const Category = ({ props }) => {
  const dispatch = useDispatch();

  const Categories = useSelector(state => state.Categories);
  const categories = Categories.categories;
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categories) {
    console.log("Opend the SC Window-GJHKHK", Object.keys(categories));
  }
  // console.log("GJHKHK", ...categories);

  return (
    <ScreenContentLayout
      pageTitle="Categories"
      addModalContent={<AddCategory />}>
      {
        Categories.loading ?
          <Loader /> :
          <Card.Group itemsPerRow={5} doubling>
            {
              categories && Object.keys(categories).length !== 0 &&
              Object.keys(categories).map(categoryKey => {
                console.log("CATEGORY-SNAP-CK", categoryKey);
                return (
                  <CategoryCard key={categoryKey} categoryKey={categoryKey} category={categories[categoryKey]} />
                )
              })
            }
          </Card.Group>
      }
    </ScreenContentLayout>
  )
}

export default Category;