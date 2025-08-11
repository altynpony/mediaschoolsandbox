#!/bin/bash

echo "🚀 Starting MediaSchool Development Environment"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to kill processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down all services...${NC}"
    pkill -P $$
    exit
}
trap cleanup INT

# 1. Start your existing project on port 3002
echo -e "${GREEN}1. Starting existing project on port 3002...${NC}"
echo -e "${YELLOW}   NOTE: Update your existing project to run on port 3002!${NC}"
# cd /path/to/your/existing/project && PORT=3002 npm start &

# 2. Start MediaSchool backend on port 3001
echo -e "${GREEN}2. Starting MediaSchool backend on port 3001...${NC}"
cd /Users/yury/mediaschoolsandbox/backend && PORT=3001 npm run dev &

# 3. Wait for services to start
sleep 5

# 4. Start proxy server on port 3000
echo -e "${GREEN}3. Starting proxy server on port 3000...${NC}"
cd /Users/yury/mediaschoolsandbox && node proxy-server.js &

# 5. Your ngrok should point to port 3000
echo -e "\n${GREEN}✅ All services started!${NC}"
echo "============================================="
echo "Access your apps at:"
echo "  - Main app: https://vast.mediaschool.ai/"
echo "  - MediaSchool: https://vast.mediaschool.ai/sandbox/"
echo ""
echo "Local access:"
echo "  - Proxy: http://localhost:3000"
echo "  - MediaSchool: http://localhost:3001"
echo "  - Existing app: http://localhost:3002"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Keep script running
wait