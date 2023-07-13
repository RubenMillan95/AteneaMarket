
/**
 * Lógica de negocio para el microservicio carrito de Compras
 * @author Ruben Felipe Millan Delgado <necroptich@gmail.com>
 */


import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma= new PrismaClient()

export const getProductInventory =async (req:Request, res:Response)=>{

    //const idProduct= req.params.idProduct
    const {idProduct}= req.params
    let myProduct= parseInt(idProduct)

    //Verificar que idProduct sea un número

    if(isNaN(myProduct)){
        res.status(400)
        res.json({error: 'Error'})
       
    }
   
    try{
        const ProductInventory= await prisma.product.findUnique(
            {
                where:{
                    id:myProduct
                }
            }
        )
        res.json(ProductInventory)
    }catch(error){
        console.error("Ocurrió un error", error)
        res.status(503)
        res.json({error:'Service Unavailable'})
    }
    
}


