import os
from selenium import webdriver


SUBMIT_XPATH = '/html/body/div[6]/div/button[3]'
HEX_XPATH = lambda idx: f'/html/body/div[6]/ul/li[{idx}]/div/a'


def main():
    driver = webdriver.Chrome(os.path.join('.', 'drivers', 'chromedriver'))
    driver.get("https://paraulogic.rodamots.cat/")

    with open('catala.txt', mode='r') as f:
        dict = [line.strip() for line in f.readlines()]

    required = None
    char2xPath = {}
    options = []

    for i in range(1, 8):
        option = driver.find_element_by_xpath(f'{HEX_XPATH(i)}/p').text
        if i == 4:
            required = option
        
        options.append(option)
        char2xPath[option] = HEX_XPATH(i)

    options = set(options)

    print(f'Required: {required}')
    print(f'Options: {options}')

    submitButton = driver.find_element_by_xpath(SUBMIT_XPATH)

    with open('results.txt', mode='w') as f:
        for word in dict:
            if (
                len(word) > 3 and 
                required in word and
                set(word).issubset(options)
            ):
                f.write(word + '\n')
                for c in word:
                    xPath = char2xPath[c]
                    element = driver.find_element_by_xpath(xPath)
                    element.click()
                submitButton.click()


if __name__ == '__main__':
    main()