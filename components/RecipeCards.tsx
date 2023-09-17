// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RecipeType } from './RecipesGrid';


export interface RecipeCardProp {
  recipe: RecipeType;
}

function RecipeCards({recipe}: RecipeCardProp) {


  const {id, image, title} = recipe;

  return (
    <>
      <div className="RecipeCard">
        <button className='favIcon'>❤ 0</button>
                    <img className= "RecipeImage" src={image} alt={title} key={id} />
                    <h3>{title}</h3><br />
                    <Link style={{backgroundColor:"black",  justifyItems:"baseline", alignSelf:"center", borderRadius:"10px", width:"8rem"}} to={`${recipe.id}`}><h4>View More</h4></Link>
                </div>

    </>
  )
}

export default RecipeCards
