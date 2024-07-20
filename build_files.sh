
echo "BUILD START"
python3.9 -m pip install -r requirements.txt

echo "Running collectstatic..."
python3.9 manage.py collectstatic --noinput --clear

echo "Contents of staticfiles_build directory:"
ls -al staticfiles_build

echo "Contents of staticfiles_build/static directory:"
ls -al staticfiles_build/static

echo "BUILD END"