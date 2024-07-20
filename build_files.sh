
echo "BUILD START"
Python 3.11 -m pip install -r requirements.txt
Python 3.11 manage.py collectstatic --noinput --clear
echo "BUILD END"
