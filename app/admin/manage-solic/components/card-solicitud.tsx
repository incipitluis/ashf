"use client"

import { User, FileText, Calendar, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SelectSolicitud } from "@/db/schema";
import { updateSolicitudStatus } from "../../actions";



export function CardSolicitud(solicitud: SelectSolicitud) {

    const handleAprobar = async () => {
        await updateSolicitudStatus(solicitud.id, 'ACEPTADO');
    }

    const handleRechazar = async () => {
        await updateSolicitudStatus(solicitud.id, 'RECHAZADO');
    }

  return (
    <Card className="w-full max-w-lg bg-white shadow-sm hover:shadow transition-all duration-200">
      <CardContent className="py-2.5">
        <div className="flex flex-row justify-between">
        <div className="space-y-2">
        
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-1 rounded-md">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-gray-500">Revisor:</p>
                <p className="text-sm font-medium text-gray-900">{solicitud.revisor}</p>
              </div>
            </div>
          </div>

      
          <div className="flex items-center space-x-3">
            <div className="bg-purple-50 p-1 rounded-md">
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-gray-900">{solicitud.articulo}</p>
              </div>
            </div>
          </div>

         
          <div className="flex items-center space-x-3">
            <div className="bg-amber-50 p-1 rounded-md">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-gray-900">{solicitud.year}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 h-7 px-2.5"
          onClick={handleRechazar}
        >
          <X className="w-3.5 h-3.5 mr-1" />
          
        </Button>
        <Button
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700 h-7 px-2.5"
          onClick={handleAprobar}
        >
          <Check className="w-3.5 h-3.5 mr-1" />
          
        </Button>
        </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 py-2.5">
        
      </CardFooter>
    </Card>
  );
}