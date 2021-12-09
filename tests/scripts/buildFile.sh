rm -r tests/output
mkdir -p tests/output

echo REACT_APP_PROCESS_ENV: "$REACT_APP_PROCESS_ENV" >> tests/output/test.txt
echo REACT_APP_DOT_ENV: "$REACT_APP_DOT_ENV" >> tests/output/test.txt
echo REACT_APP_NO_INPUT: "$REACT_APP_NO_INPUT" >> tests/output/test.txt
echo GENERIC_ENV: "$GENERIC_ENV" >> tests/output/test.txt
echo REACT_APP_BYPASS_ENV: "$REACT_APP_BYPASS_ENV" >> tests/output/test.txt
echo PUBLIC_URL: "$PUBLIC_URL" >> tests/output/test.txt

echo REACT_APP_INJECT_ENV1: "$REACT_APP_INJECT_ENV1" >> tests/output/test2.txt
echo REACT_APP_INJECT_ENV2: "$REACT_APP_INJECT_ENV2" >> tests/output/test2.txt
echo PUBLIC_URL: "$PUBLIC_URL" >> tests/output/test2.txt

mkdir -p tests/output/test3
echo REACT_APP_INJECT_ENV3: "$REACT_APP_INJECT_ENV3" >> tests/output/test3/test3.txt
echo REACT_APP_INJECT_ENV3: "$REACT_APP_INJECT_ENV3" >> tests/output/test3/test3b.txt

echo REACT_APP_INJECT_ENV4: "$REACT_APP_INJECT_ENV4" >> tests/output/test4.txt



