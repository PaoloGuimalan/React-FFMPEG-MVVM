import { useState } from "react";
import { AuthVModelInstance } from "../../core/vmodels/auth/AuthVModel";
import { useDispatch } from "react-redux";

function Login() {

  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const { setUser } = AuthVModelInstance;
  const dispatch = useDispatch();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            margin: 0,
            color: '#333',
            fontSize: '1.5rem'
          }}>My Website</h1>
          <nav>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '1.5rem'
            }}>
              <li>
                <a href="/" style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>Home</a>
              </li>
              <li>
                <a href="/about" style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>About</a>
              </li>
              <li>
                <a href="/contact" style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '3rem 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left Side - Welcome Content */}
          <div style={{
            flex: 1,
            maxWidth: '500px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Welcome to Our Platform
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              Join thousands of users who are already using our platform to manage their projects, collaborate with teams, and achieve their goals.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#4f46e5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>✓</div>
                <span style={{ color: '#4b5563' }}>Secure and reliable platform</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#4f46e5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>✓</div>
                <span style={{ color: '#4b5563' }}>24/7 customer support</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#4f46e5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>✓</div>
                <span style={{ color: '#4b5563' }}>Easy to use interface</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div style={{
            flex: 1,
            maxWidth: '400px',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '1.875rem',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '2rem'
            }}>
              Sign in to your account
            </h2>
            <form 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="email" style={{ display: 'none' }}>Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    backgroundColor: '#ffffff',
                    color: '#111827',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" style={{ display: 'none' }}>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    backgroundColor: '#ffffff',
                    color: '#111827',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    style={{
                      height: '1rem',
                      width: '1rem',
                      color: '#4f46e5',
                      borderColor: '#d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                  <label 
                    htmlFor="remember-me" 
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#111827'
                    }}
                  >
                    Remember me
                  </label>
                </div>

                <div style={{ fontSize: '0.875rem' }}>
                  <a 
                    href="#" 
                    style={{
                      fontWeight: '500',
                      color: '#4f46e5',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#4338ca'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#4f46e5'}
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                onClick={() => {
                    setUser({
                        auth: true,
                        user: {
                            firstName: email.split("@")[0],
                            lastName: email.split("@")[1],
                            email: email
                        }
                    }, dispatch);
                }}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0 }}>© 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;