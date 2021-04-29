<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserAuthenticator extends AbstractGuardAuthenticator{

    use TargetPathTrait;

        private $em;
        private $urlGenerator;
        private $csrfTokenManager;
        private $passwordEncoder;
        public function __construct(EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, CsrfTokenManagerInterface $csrfTokenManager, UserPasswordEncoderInterface $passwordEncoder)
        {
            $this->em = $em;
            $this->urlGenerator = $urlGenerator;
            $this->csrfTokenManager = $csrfTokenManager;
            $this->passwordEncoder = $passwordEncoder;
        }
    
        /**
         * Called on every request to decide if this authenticator should be
         * used for the request. Returning `false` will cause this authenticator
         * to be skipped.
         */
        public function supports(Request $request)
        {
            return true;
        }
    
        /**
         * Called on every request. Return whatever credentials you want to
         * be passed to getUser() as $credentials.
         */
        // public function getCredentials(Request $request)
        // {
        //     $mail = json_decode($request->getContent());
        //     // dd($request->getContent());
            
        //    foreach($mail as $key => &$m){
        //        if ($key!==0) break;
        //     }
        //     // $credentials = [
        //     //     'email' => $m,
        //     //     // 'password' => $request->request->get('password')
        //     // ];
        //     // dd($m);
        //     // $request->getSession()->set(
        //     //     Security::LAST_USERNAME,
        //     //     $credentials['email']
        //     // );
        //     // dd($credentials);
        //     return $m;
        // }
        public function getCredentials(Request $request)
        {
            // dd($request->request->all());
            // $mail = json_decode($request->getContent());
            $mail = json_decode($request->getContent(),$associative = true);

            // dd($this->csrfTokenManager);
            // $arr = [];

        //    foreach($mail as $m){
        //     //    if ($key!==0) break;
        //        array_push($arr,$m);
        //     }
            // dd($arr);
            // $credentials = [
            //     'email' => $request->request->get('email'),
            //     'password' => $request->request->get('password'),
            //     'csrf_token' => $request->request->get('_csrf_token'),
            // ];
            // $request->getSession()->set(
            //     Security::LAST_USERNAME,
            //     $credentials['email']
            // );
            // dd($credentials);
            return $mail;
        }
    
        public function getUser($credentials, UserProviderInterface $userProvider)
        {
            if (null === $credentials) {
                // The token header was empty, authentication fails with HTTP Status
                // Code 401 "Unauthorized"
                return null;
            }
    
            // The "username" in this case is the apiToken, see the key `property`
            // of `your_db_provider` in `security.yaml`.
            // If this returns a user, checkCredentials() is called next:
            // dd($credentials);
            return $userProvider->loadUserByUsername($credentials['username']);
        }
    
        public function checkCredentials($credentials, UserInterface $user)
        {
            // Check credentials - e.g. make sure the password is valid.
            // In case of an API token, no credential check is needed.
    
            // Return `true` to cause authentication success
            return true;
        }
    
        public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
        {
            // on success, let the request continue
            return null;
        }
    
        public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
        {
            $data = [
                // you may want to customize or obfuscate the message first
                'message' => strtr($exception->getMessageKey(), $exception->getMessageData())
    
                // or to translate this message
                // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
            ];
    
            return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
        }
    
        /**
         * Called when authentication is needed, but it's not sent
         */
        public function start(Request $request, AuthenticationException $authException = null)
        {
            $data = [
                // you might translate this message
                'message' => 'Authentication Required'
            ];
    
            return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
        }
    
        public function supportsRememberMe()
        {
            return false;
        }
    }