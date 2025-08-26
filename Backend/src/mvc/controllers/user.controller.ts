import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { LoginUserDto } from '../models/dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registro')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto, description: 'Datos para el registro de un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'El usuario ha sido registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({ status: 409, description: 'El email ya está registrado.' })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('👤 [BACKEND] POST /usuarios/registro - Registrando usuario:', createUserDto);
      
      const result = await this.userService.register(createUserDto);
      
      console.log('✅ [BACKEND] Usuario registrado exitosamente:', result);
      
      return result;
    } catch (error) {
      console.error('💥 [BACKEND] Error al registrar usuario:', error);
      if (error.message === 'El email ya está registrado') {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error al registrar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiBody({ type: LoginUserDto, description: 'Credenciales de acceso' })
  @ApiResponse({ status: 200, description: 'Login exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      console.log('🔐 [BACKEND] POST /usuarios/login - Iniciando sesión:', loginUserDto.email);
      
      const result = await this.userService.login(loginUserDto);
      
      console.log('✅ [BACKEND] Login exitoso para usuario:', result.usuarioId);
      
      return result;
    } catch (error) {
      console.error('💥 [BACKEND] Error en login:', error);
      if (error.message === 'Credenciales inválidas') {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Error al iniciar sesión',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      console.log(`🔍 [BACKEND] GET /usuarios/${id} - Buscando usuario por ID`);
      
      const user = await this.userService.findById(id);
      if (!user) {
        console.log(`❌ [BACKEND] Usuario con ID ${id} no encontrado`);
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      
      console.log(`✅ [BACKEND] Usuario encontrado:`, user);
      return user;
    } catch (error) {
      console.error(`💥 [BACKEND] Error al buscar usuario con ID ${id}:`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida con éxito.' })
  async findAll() {
    try {
      console.log('📋 [BACKEND] GET /usuarios - Solicitando todos los usuarios');
      
      const result = await this.userService.findAll();
      
      console.log(`✅ [BACKEND] Se encontraron ${result.length} usuarios:`, result);
      
      return result;
    } catch (error) {
      console.error('💥 [BACKEND] Error al obtener usuarios:', error);
      throw new HttpException(
        'Error al obtener la lista de usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
