import { NextResponse } from 'next/server';
import { Conceitualizacao } from '@/models/Conceitualizacao';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
  

    // Intentamos crear el documento
    const conceitualizacao = await Conceitualizacao.create(data);


    return NextResponse.json({
      success: true,
      message: 'Conceptualización guardada exitosamente',
      data: conceitualizacao
    }, { status: 201 });

  } catch (error) {
    console.error('Error detallado:', error);
    
    // Manejamos diferentes tipos de errores
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({
        success: false,
        message: 'Error de validación',
        errors: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Error al guardar la conceptualización',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}