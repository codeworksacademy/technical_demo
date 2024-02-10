let tests = [
  {
    name: 'HTML Basic Check',
    message: 'Add an H1 Element to the page with your name as the text',
    passed: false,
    test() {
      let h1 = document.querySelector('h1')
      if (!h1) { return }
      if (!h1.innerText) {
        throw new Error('Good Job! you have an H1 but you need to add some text inside of it...')
      }
      this.passed = true
    }
  },
  {
    name: 'Connecting CSS',
    message: 'Create and link a stylesheet to change the color of body\'s background of the page to bisque',
    passed: false,
    test() {
      let bodyStyle = getComputedStyle(document.body)
      let link = document.querySelector('link[href="style.css"]')

      if (!link) {
        throw new Error('You need to add a reference to the external stylesheet named "style.css", use a link element with the rel and href attributes')
      }

      if (bodyStyle.backgroundColor != 'rgb(255, 228, 196)') {
        throw new Error('The body\'s background has not been set to the color bisque')
      }

      this.passed = true
    }
  },
  {
    name: 'The JavaScript Console',
    message: 'Use the javascript console to log the tax found in script.js',
    passed: false,
    test() {
      let script = document.querySelector('script[src="script.js"]')

      if (!script) {
        throw new Error('You need to add a reference to the external javascript file named "script.js", use a script element with the src attribute')
      }

      this.passed = log.includes(1.82)
    }
  },
  {
    name: 'Setting a minimum tip',
    message: 'Create a variable called minimumTip and set its value to 5',
    passed: false,
    test() {
      this.passed = log.includes(5)
    }
  },
  {
    name: 'Tipping on account of good service',
    message: 'Log the minimumTip variable multipled by 2.2',
    passed: false,
    test() {
      this.passed = log.includes(11)
    }
  },
  {
    name: 'Looking at Lobsters 👀',
    message: 'Log the 🦞 to the conosle for the number of lobsters in the tank',
    passed: false,
    test() {
      this.passed = log.filter(i => i == '🦞').length >= 18
    }
  },
  {
    name: 'The Restaurant Name',
    message: 'JavaScript Challenges - Log the name of the restaurant!',
    passed: false,
    test() {
      this.passed = log.includes('Boca Coast Ristorante')
    }
  },
  {
    name: 'Combining the Street and City',
    message: 'JavaScript Challenges - Log the full address street and city of the restaurant!',
    passed: false,
    test() {
      if (log.includes('Torrington, CT 06790') && !log.includes('594 Lakeshore Street, Torrington, CT 06790')) {
        throw new Error('Be sure to use a comma and string interpolation when combining the street and city')
      }

      this.passed = log.includes('594 Lakeshore Street, Torrington, CT 06790')
    }
  },
  {
    name: 'Totaling the Menu - No Tax',
    message: 'JavaScript Challenges - Log the total price of all menu items!',
    passed: false,
    test() {
      this.passed = log.includes(92.53)
    }
  },
  {
    name: 'Totaling the GF: Menu - No Tax',
    message: 'JavaScript Challenges - Log the total price of all gluten free menu items!',
    passed: false,
    test() {
      this.passed = log.includes(40.89)
    }
  }
]



// #region DONT_MODIFY

let stats = {
  failedTests: 0,
  passedTests: 0,
  totalTests: 0
}

// INTERCEPTOR
window.log = []
let fn = window.console.log
window.console.log = function interceptor() {
  try {
    fn(...arguments)
    window.log = [...window.log, ...arguments]
  } catch (e) {
    console.error(e)
  }
}

function evaluateLog(log, stats) {
  tests.forEach(t => {
    let comments = []
    try {
      t.passed = false
      t.test()
    } catch (e) {
      comments.push(e.message)
    }
    finally {
      t.passed ? stats.passedTests++ : stats.failedTests++
      if (t.passed) {
        return logPass(t.name)
      }
      console.group('❌', t.name)
      logInput(t.message)
      comments.forEach(c => logWarn(c))
      console.groupEnd()
    }
  })

}

function runTests() {
  stats = {
    failedTests: 0,
    passedTests: 0,
    totalTests: tests.length
  }

  evaluateLog(log, stats)
  logTestStats(stats)

  if (stats.passedTests == stats.totalTests) {
    console.log('✅', 'ALL TESTS PASSED!!!')
  }
}

async function start() {
  setTimeout(runTests, 500)
}

start()

function logInput() { console.table('🧪', ...arguments) }
function logFail() { console.table('❌', ...arguments) }
function logPass() { console.table('✅', ...arguments) }
function logWarn() { console.table('💭', ...arguments) }



function logTestStats(stats) {
  console.table(
    '\n-------------------------------\n',
    '🧪', ':', stats.totalTests,
    '✅', ':', stats.passedTests,
    '❌', ':', stats.failedTests)
}

// #endregion
