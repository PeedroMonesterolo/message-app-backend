import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { MensajeDto } from './dto/MensajeDto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    
    constructor(private mensajeService: MensajesService) { }

    @Post()
    create(@Body() mensaje: MensajeDto, @Res() response) {
        return this.mensajeService.create(mensaje).then(data => {
            response.status(HttpStatus.CREATED).json(data);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la creacion del mensaje' });
        });
    }

    @Get()
    getAll(@Res() response) {
        return this.mensajeService.getAll().then(data => {
            response.status(HttpStatus.OK).json(data);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la obtencion de los mensajes' });
        });
    }

    @Put(':id')
    update(@Body() mensaje: MensajeDto, @Param('id') idMensaje, @Res() response) {
        return this.mensajeService.updateMensaje(idMensaje, mensaje).then(data => {
            response.status(HttpStatus.OK).json(data);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la edicion del mensaje' });
        });
    }

    @Delete(':id')
    delete(@Param('id') idMensaje, @Res() response) {
        return this.mensajeService.deleteMensaje(idMensaje).then(data => {
            response.status(HttpStatus.OK).json(data);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la eliminacion del mensaje' });
        });
    }
}
