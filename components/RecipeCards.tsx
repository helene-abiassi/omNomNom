// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RecipeCardProp } from '../src/types/customTypes';



function RecipeCards({recipe}: RecipeCardProp) {


  const {id, image, title, readyInMinutes, servings} = recipe;
  // console.log('recipe.title :>> ', recipe.title);

  return (
    <>
      <div className="RecipeCard">
        <button className='favIcon'>❤ 0</button>
                    <img className= "RecipeImage" src={image} alt={title} key={id} />
                    <h3>{title}</h3>
                    <p style={{textAlign:"left", marginLeft:"2rem"}}>Ready in {readyInMinutes} mns. Serves {servings} humans</p>
                    <Link className='linkButton' to={`${recipe.id}`} state={{ recipe:recipe }}><h4>View More</h4></Link>
                </div>

    </>
  )
}

export default RecipeCards


