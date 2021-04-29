<?php
// src/EventListener/JWTEncodedListener.php
namespace App\EventListener;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTEncodedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class JWTEncodedListener{

    private $em;
    
    public function __construct(EntityManagerInterface $em){
        $this->em = $em;
    }
/**
 * @param JWTEncodedEvent $event
 */
    function onJwtEncoded(JWTEncodedEvent $event)
    {
        $token = $event->getJWTString();
        // $this->jwtString = "get hacked!";

        // $user = $event->getUser();
        // onSuccessEvent($event2);

    // (function(AuthenticationSuccessEvent $event2){
        
    //     $user = $event2->getUser();

        $myfile = fopen("/home/lphilippe/Documents/microServices/tokenApi/test/truc.html", "w") or dd("Unable to open file!");
            $txt = $token;
            fwrite($myfile, $txt);
            fclose($myfile);
            // $txt = json_decode($txt,true);
        // dd($user);
    // });
        // return "get hacked!";

    }
public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();

        $user = $event->getUser();
        if($user instanceOf User){
            $user->setToken($data['token']);
        }

        if (!$user instanceof UserInterface) {
            return;
        }
        $this->em->persist($user);
        $this->em->flush();
    }
}