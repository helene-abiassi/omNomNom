// import React from 'react'
import { RecipeType } from './Recipes';
// import Recipes from './Recipes'

interface RecipeCardProp {
  recipe: RecipeType;
}

function RecipeCards({recipe}: RecipeCardProp) {
  // const [show, setShow] = useState(false);

  const {id, image, title} = recipe;

  return (
    <div>
      <div className="RecipeCard">
                    <img className= "RecipeImage" src={image} alt={title} key={id} />
                    <h3>{title}</h3>
                </div>

    </div>
  )
}

export default RecipeCards