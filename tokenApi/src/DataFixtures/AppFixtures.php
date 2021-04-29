<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('FR-fr');
              for($i=0; $i<30;$i++){
         $author1 = new User();
        $hash = $this->encoder->encodePassword($author1,'password');
        $author1->setEmail($faker->email)
                ->setName($faker->lastName)
                ->setPassword($hash);

        $manager->persist($author1);

              } 
        $manager->flush();
    }
}
