set -e
mkdir -p node-learning-project  
# -p is a lang to prevent error from parent folder is already exist
cd node-learning-project # cd- call directory 
npm init -y # npm-node package manager , init- initialize (-y:it keeps the answer as yes)
echo "Project created in $(pwd)" # pwd- present working directory
