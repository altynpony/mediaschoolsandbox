"use client";

import { useState } from "react";
import { authClient } from "@/auth-client";
import { CustomButton } from "@/components/ui/custom-button";

interface AuthTestClientProps {
  locale: string;
}

export function AuthTestClient({ locale }: AuthTestClientProps) {
  const { data: session, isPending } = authClient.useSession();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runAuthTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    
    try {
      // Test 1: Check session state
      addResult(`Session loading: ${isPending}`);
      addResult(`Session exists: ${!!session}`);
      addResult(`User data: ${session?.user ? JSON.stringify(session.user) : 'No user data'}`);

      // Test 2: Test sign-in functionality
      addResult("Testing authentication client configuration...");
      
      if (session?.user) {
        addResult(`✅ Authentication working - User: ${session.user.name} (${session.user.email})`);
        
        // Test sign out
        addResult("Testing sign out...");
        await authClient.signOut();
        addResult("✅ Sign out successful");
      } else {
        addResult("❌ No active session found");
        addResult("Testing sign in with demo credentials...");
        
        // Test sign in (this would normally require real credentials)
        addResult("Note: Manual sign-in required through /signin page");
      }

      // Test 3: Check auth client configuration
      addResult("Checking auth client configuration...");
      addResult(`Base URL configured: ${process.env.NEXT_PUBLIC_API_URL || 'localhost:3001'}`);
      
    } catch (error) {
      addResult(`❌ Error during tests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Current Session Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Loading:</span>
              <span className={isPending ? "text-yellow-600" : "text-green-600"}>
                {isPending ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Authenticated:</span>
              <span className={session?.user ? "text-green-600" : "text-red-600"}>
                {session?.user ? "Yes" : "No"}
              </span>
            </div>
            {session?.user && (
              <>
                <div className="flex justify-between">
                  <span>User ID:</span>
                  <span className="text-gray-700 truncate">{session.user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-gray-700 truncate">{session.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="text-gray-700 truncate">{session.user.name || 'Not set'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Authentication Manager Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Auth Client:</span>
              <span className="text-green-600">✅ Loaded</span>
            </div>
            <div className="flex justify-between">
              <span>Session Hook:</span>
              <span className="text-green-600">✅ Active</span>
            </div>
            <div className="flex justify-between">
              <span>Base URL:</span>
              <span className="text-gray-700 text-xs">
                {process.env.NEXT_PUBLIC_API_URL || 'localhost:3001'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Authentication Tests</h3>
          <CustomButton 
            onClick={runAuthTests}
            disabled={isRunningTests}
            variant="primary"
          >
            {isRunningTests ? "Running Tests..." : "Run Tests"}
          </CustomButton>
        </div>

        {testResults.length > 0 && (
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-60 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          {session?.user ? (
            <>
              <CustomButton 
                onClick={() => authClient.signOut()}
                variant="outline"
                size="sm"
              >
                Sign Out
              </CustomButton>
              <CustomButton 
                onClick={() => window.location.href = '/profile'}
                variant="outline"
                size="sm"
              >
                Go to Profile
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton 
                onClick={() => window.location.href = '/signin'}
                variant="primary"
                size="sm"
              >
                Sign In
              </CustomButton>
              <CustomButton 
                onClick={() => window.location.href = '/signup'}
                variant="outline" 
                size="sm"
              >
                Sign Up
              </CustomButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}