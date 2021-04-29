<?php

namespace App\Controller;

use App\Entity\User;
use App\Services\JsonDispatch;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController {
    /**
     * @Route("/api/check_token", name="api_check")
     */
    public function index(Request $request): Response {
        $data = $request->server->getHeaders();
        $repo = $this->getDoctrine()->getRepository(User::class);
        // $res = $repo->findAll();
        $token = explode(" ",$data["AUTHORIZATION"]);
        $token[1];
        $res = $repo->findBytoken($token[1]);
        // dd($res);
        $json = new JsonDispatch($res);
        return $json->getResponse();
    }
         /**
     * @Route("/api/login_check", name="app_login")
     */
    public function login(): JsonResponse {
        // // get the login error if there is one
        // $error = $authenticationUtils->getLastAuthenticationError();
        // // last username entered by the user
        // $lastUsername = $authenticationUtils->getLastUsername();
        // return new Response($lastUsername);
        $user = $this->getUser();
        // dd($user);
        // return new JsonResponse([
        //     'email' => $user->getEmail(),
        //     'roles' => $user->getRoles(),
        // ]);    
        return new JsonResponse(['ok']);
    }
}
