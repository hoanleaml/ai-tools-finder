/**
 * Authentication Flow Test Script
 * Tests authentication endpoints and functionality
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

async function testEndpoint(url: string, method: string = "GET", body?: any) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    let data;
    try {
      data = await response.json();
    } catch {
      data = { text: await response.text() };
    }
    
    return {
      status: response.status,
      ok: response.ok,
      data,
      headers: Object.fromEntries(response.headers.entries()),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function runTests() {
  console.log("🧪 Testing Authentication Flow...\n");

  // Test 1: Login page accessible
  console.log("Test 1: Login page accessible");
  const loginPage = await testEndpoint(`${BASE_URL}/login`);
  console.log(`  Status: ${loginPage.status}`);
  console.log(`  Result: ${loginPage.ok ? "✅ PASS" : "❌ FAIL"}\n`);

  // Test 2: Admin route redirects to login (unauthenticated)
  console.log("Test 2: Admin route redirects to login (unauthenticated)");
  const adminRedirect = await testEndpoint(`${BASE_URL}/admin`);
  console.log(`  Status: ${adminRedirect.status}`);
  console.log(`  Redirect: ${adminRedirect.status === 307 || adminRedirect.status === 308 ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`  Location: ${adminRedirect.headers.location || "N/A"}\n`);

  // Test 3: Logout API endpoint exists
  console.log("Test 3: Logout API endpoint exists");
  const logoutEndpoint = await testEndpoint(`${BASE_URL}/api/auth/logout`, "POST");
  console.log(`  Status: ${logoutEndpoint.status}`);
  console.log(`  Result: ${logoutEndpoint.status === 200 || logoutEndpoint.status === 401 ? "✅ PASS" : "❌ FAIL"}\n`);

  // Test 4: Middleware configuration
  console.log("Test 4: Middleware configuration");
  const middlewareTest = await testEndpoint(`${BASE_URL}/admin`);
  const hasRedirect = middlewareTest.status === 307 || middlewareTest.status === 308;
  console.log(`  Middleware active: ${hasRedirect ? "✅ PASS" : "❌ FAIL"}\n`);

  console.log("✅ Test suite completed!");
  console.log("\nNote: Full authentication flow requires manual testing with valid credentials.");
}

runTests().catch(console.error);

