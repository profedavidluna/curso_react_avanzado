import {useContext} from 'react'
import DataContext from '@/context/DataContext.jsx';
import CategoryList from '@/components/CategoryList';
function ContextTest({categorias, autores, libros}) {
 const context = useContext(DataContext)
    console.log("Contexto : " ,  context)

    if(context.categorias.length === 0){
      context.categorias.push(categorias);
    }
    if(context.autores.length==0)
      context.autores.push(autores)
    if(context.libros.length==0)
      context.libros.push(libros)
    
    console.log("Contexto : " ,  context)

  return (
    <CategoryList categories={context.categorias} />
  )
}

export default ContextTest