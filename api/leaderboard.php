<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple file-based storage for demo (in production, use a proper database)
$dataFile = '/tmp/leaderboard.json';

function readLeaderboard() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return [];
    }
    $data = file_get_contents($dataFile);
    return json_decode($data, true) ?: [];
}

function writeLeaderboard($data) {
    global $dataFile;
    return file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

function validateInput($data) {
    if (!isset($data['name']) || !isset($data['score'])) {
        return false;
    }
    
    $name = trim($data['name']);
    $score = intval($data['score']);
    
    if (empty($name) || strlen($name) > 50 || $score < 0 || $score > 999999) {
        return false;
    }
    
    return [
        'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
        'score' => $score,
        'date' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $leaderboard = readLeaderboard();
            
            // Sort by score descending and limit to top 20
            usort($leaderboard, function($a, $b) {
                return $b['score'] - $a['score'];
            });
            
            $leaderboard = array_slice($leaderboard, 0, 20);
            
            echo json_encode([
                'success' => true,
                'data' => $leaderboard
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to read leaderboard'
            ]);
        }
        break;
        
    case 'POST':
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'error' => 'Invalid JSON data'
                ]);
                break;
            }
            
            $validatedData = validateInput($input);
            if (!$validatedData) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'error' => 'Invalid input data'
                ]);
                break;
            }
            
            $leaderboard = readLeaderboard();
            
            // Anti-spam: limit submissions per IP per minute
            $currentTime = time();
            $recentSubmissions = array_filter($leaderboard, function($entry) use ($validatedData, $currentTime) {
                return $entry['ip'] === $validatedData['ip'] && 
                       (strtotime($entry['date']) > ($currentTime - 60));
            });
            
            if (count($recentSubmissions) >= 3) {
                http_response_code(429);
                echo json_encode([
                    'success' => false,
                    'error' => 'Too many submissions. Please wait a minute.'
                ]);
                break;
            }
            
            $leaderboard[] = $validatedData;
            
            if (writeLeaderboard($leaderboard) === false) {
                throw new Exception('Failed to save data');
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Score saved successfully'
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to save score'
            ]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'error' => 'Method not allowed'
        ]);
        break;
}
?>