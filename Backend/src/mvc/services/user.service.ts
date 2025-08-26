import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { UserMapper } from '../models/mappers/user.mapper';
import { User } from '../models/entities/user.entity';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { LoginUserDto } from '../models/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  async register(createDto: CreateUserDto): Promise<User> {
    console.log('👤 [BACKEND-SERVICE] Registrando usuario en base de datos:', createDto);
    
    // Verificar si el email ya existe
    const existingUser = await this.prisma.usuarios.findUnique({
      where: { email: createDto.email },
    });

    if (existingUser) {
      console.log('❌ [BACKEND-SERVICE] Email ya registrado:', createDto.email);
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(createDto.password, 10);
    console.log('🔐 [BACKEND-SERVICE] Contraseña hasheada exitosamente');

    // Crear el usuario
    const newUserPrisma = await this.prisma.usuarios.create({
      data: {
        nombre_completo: createDto.nombreCompleto,
        email: createDto.email,
        password_hash: passwordHash,
      },
    });

    console.log('💾 [BACKEND-SERVICE] Usuario creado en base de datos:', newUserPrisma);
    
    const mappedUser = this.mapper.toDomain(newUserPrisma);
    console.log('🔄 [BACKEND-SERVICE] Usuario mapeado a dominio:', mappedUser);
    
    return mappedUser;
  }

  async login(loginDto: LoginUserDto): Promise<User> {
    console.log('🔐 [BACKEND-SERVICE] Verificando credenciales para login:', loginDto.email);
    
    // Buscar usuario por email
    const userPrisma = await this.prisma.usuarios.findUnique({
      where: { email: loginDto.email },
    });

    if (!userPrisma) {
      console.log('❌ [BACKEND-SERVICE] Usuario no encontrado para login:', loginDto.email);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    console.log('💾 [BACKEND-SERVICE] Usuario encontrado en base de datos:', userPrisma);

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, userPrisma.password_hash);
    
    if (!isPasswordValid) {
      console.log('❌ [BACKEND-SERVICE] Contraseña inválida para usuario:', loginDto.email);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    console.log('✅ [BACKEND-SERVICE] Contraseña verificada exitosamente');
    
    const mappedUser = this.mapper.toDomain(userPrisma);
    console.log('🔄 [BACKEND-SERVICE] Usuario mapeado a dominio para login:', mappedUser);
    
    return mappedUser;
  }

  async findById(id: number): Promise<User> {
    console.log(`🔍 [BACKEND-SERVICE] Buscando usuario con ID ${id} en base de datos`);
    
    const userPrisma = await this.prisma.usuarios.findUnique({
      where: { usuario_id: id },
    });

    if (!userPrisma) {
      console.log(`❌ [BACKEND-SERVICE] Usuario con ID ${id} no encontrado en base de datos`);
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    console.log(`💾 [BACKEND-SERVICE] Usuario encontrado en base de datos:`, userPrisma);
    
    const mappedUser = this.mapper.toDomain(userPrisma);
    console.log(`🔄 [BACKEND-SERVICE] Usuario mapeado a dominio:`, mappedUser);
    
    return mappedUser;
  }

  async findAll(): Promise<User[]> {
    console.log('📋 [BACKEND-SERVICE] Consultando todos los usuarios en base de datos');
    
    const usersPrisma = await this.prisma.usuarios.findMany();
    console.log(`💾 [BACKEND-SERVICE] Se encontraron ${usersPrisma.length} usuarios en base de datos:`, usersPrisma);
    
    const mappedUsers = usersPrisma.map(this.mapper.toDomain);
    console.log('🔄 [BACKEND-SERVICE] Usuarios mapeados a dominio:', mappedUsers);
    
    return mappedUsers;
  }
}
