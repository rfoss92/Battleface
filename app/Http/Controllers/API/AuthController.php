<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use DateTimeImmutable;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once('../vendor/autoload.php');

class AuthController extends BaseController
{
    public function getAuth(Request $request) {
        $secretKey  = env('JWT_SECRET');
        $tokenId    = base64_encode(random_bytes(16));
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+60 minutes')->getTimestamp();
        $serverName = "your.domain.name";
    
        $data = [
            'iat'  => $issuedAt->getTimestamp(),
            'jti'  => $tokenId,
            'iss'  => $serverName,
            'nbf'  => $issuedAt->getTimestamp(),
            'exp'  => $expire
        ];
    
        return JWT::encode($data, $secretKey, 'HS512');
    }
}
