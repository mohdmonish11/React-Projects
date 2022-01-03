import { isEmpty } from 'lodash';
import React from 'react';
import "./ListRecipe.css";

const ListRecipe = ({apidata, listType}) => {

  console.log(apidata);
  // console.log(listType);
  return (
    <div className="main-elements-box">
      <div className="heading-list-recipe">
        {(listType === 'c') && <p>List Categories</p>}
        {(listType === 'i') && <p>List Ingredient</p>}
        {(listType === 'a') && <p>List Area</p>}
      </div>
      <div className="box-elements">
        {!isEmpty(apidata) && apidata.map(data => {
          const {strCategory, strArea, strIngredient} = data;
            return(
              <div className="sub-box-element">
                {!isEmpty (strCategory) && <h3 key={strCategory} className="strcategory">{strCategory}</h3>}
                {!isEmpty (strArea) && <h3 key={strArea} className="strarea">{strArea}</h3>}
                {!isEmpty (strIngredient) && <h3 key={strIngredient}className="stringredient">{strIngredient}</h3>}
              </div>
            )})
          }
      </div>
    </div>
  )
}

export default ListRecipe;
