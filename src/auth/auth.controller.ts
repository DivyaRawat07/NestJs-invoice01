import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "src/users/user.model";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): { access_token: string } {
        return this.authService.login(req.user as User);
    }
}