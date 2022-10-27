import  {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { agregarCliente } from '../data/Cliente';


export async function action({request}) {

  //Sacamos la informacion del formulario
  const formData = await request.formData();
  //Estructuramos la informacion por partes
  const datos = Object.fromEntries(formData);

  //datos de diferentes campos para validar
  const email = formData.get('email');
  
  // Validacion
  const errores = [];
  if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios');
  }

  //Validacion para el correo para el formato adecuado
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  //Para que se ejecute, tenemos que negar la condicion para que devuelva True y mande el mensaje
  if(!regex.test(email)){
    errores.push('El email no es valido');
  }

  //Si hay errores, retornamos datos al formulario para que se vea
  if(Object.keys(errores).length){
    return errores;
  }
 
    await agregarCliente(datos);

    return redirect('/')
}



const NuevoCliente = () => {

  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Rellenar todos los campos</p>

      <div className="flex justify-end">
          <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
          >Volver</button>
      </div>  


      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}

        <Form
          method='post'
          
        >
        <Formulario />
          <input 
          type="submit"
          className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
          value="Registrar Cliente"
          />
        </Form>
      </div>

    </>
  )
}

export default NuevoCliente