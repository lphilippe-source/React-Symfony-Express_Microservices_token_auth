<?php
namespace App\Controller\Services;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class JsonDispatch extends AbstractController{
    
private $response;
    public function __construct($res){
        $this->response = $this->json($res);
    }

    public function json($data, int $status = 200, array $headers = [], array $context = []): JsonResponse{
        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
            return $object->getId();
            }
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
        $serializer = new Serializer([$normalizer], [$encoder]);

        return new JsonResponse($serializer->serialize($data, 'json'));
    }
    
    public function getResponse(){
        // dd($this->response);
        return $this->response;
    }
}