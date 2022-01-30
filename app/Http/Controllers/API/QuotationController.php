<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Quote;
use DateTimeImmutable;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class QuotationController extends BaseController
{
    public function getQuotation(Request $request) {
        $quote = new Quote();
        $age_load = 1;
        $ages = explode (",", $request->ages); 
        $start = $request->start;
        $end = $request->end;
        $total = 0;

        foreach ($ages as $age) {
            switch($age) {
                case $age >= 18 && $age <= 30 :
                    $age_load = 0.6;
                    break;
                case $age >= 31 && $age <= 40 :
                    $age_load = 0.7;
                    break;
                case $age >= 41 && $age <= 50 :
                    $age_load = 0.8;
                    break;
                case $age >= 51 && $age <= 60 :
                    $age_load = 0.9;
                    break;
                case $age >= 61 :
                    $age_load = 1;
                    break;
            }
            $datediff = strtotime($end) - strtotime($start);
            $trip_length = round($datediff / (60 * 60 * 24)) + 1;
            $individual_total = $quote->fixed_rate * $age_load * $trip_length;
            $total += $individual_total;
        }

        $total = '$' . number_format($total, 2, '.', '');
        $quote->total = $total;
        $quote->currency_id = $request->currency_id;
        $quote->quotation_id = time() . mt_rand();

        return $quote;
    }
}
