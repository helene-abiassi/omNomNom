import { RecipeType } from './RecipesGrid';
// import Recipes from './Recipes'

interface RecipeCardProp {
  recipe: RecipeType;
}

function RecipeCards({recipe}: RecipeCardProp) {
  // const [show, setShow] = useState(false);

  const {id, image, title} = recipe;

  return (
    <>
      <div className="RecipeCard">
        <button className='favIcon'>❤</button>
                    <img className= "RecipeImage" src={image} alt={title} key={id} />
                    <h3>{title}</h3>
                    <button >View More</button>
                </div>

    </>
  )
}

export default RecipeCards
