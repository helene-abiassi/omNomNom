import { Link } from 'react-router-dom';
import { RecipeType } from './RecipesGrid';


interface RecipeCardProp {
  recipe: RecipeType;
}

function RecipeCards({recipe}: RecipeCardProp) {


  const {id, image, title} = recipe;

  return (
    <>
      <div className="RecipeCard">
        <button className='favIcon'>❤</button>
                    <img className= "RecipeImage" src={image} alt={title} key={id} />
                    <h3>{title}</h3>
                    <Link to={`${recipe.title}`}><h4>View More</h4></Link>
                </div>

    </>
  )
}

export default RecipeCards
