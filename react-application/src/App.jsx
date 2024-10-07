import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TransactionList from "./components/TransactionList";
import CreateTransaction from "./components/TransactionForm";
import FoodList from "./components/FoodsList";
import FoodForm from "./components/FoodsForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/create-transaction" element={<CreateTransaction />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/create-food" element={<FoodForm />} />\

          <Route path="/create-customers" element={<CustomerForm />} />
          <Route path="/customers" element={<CustomerList />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section text-center py-5 text-light">
        <div className="container">
          <h1 className="display-4">Welcome to the Management System</h1>
          <p className="lead">
            Easily manage and keep track of your transactions and foods with
            just a few clicks.
          </p>
        </div>
      </div>

      <div className="container my-5">
        <div className="row text-center">
          {/* Transaction Management Card */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <i className="bi bi-cart3 display-1 text-primary mb-3"></i>
              <h4>Manage Transactions</h4>
              <p>
                Easily view, edit, and delete transactions in the transaction
                list.
              </p>
              <Link to="/transactions" className="btn btn-primary">
                View Transactions
              </Link>
              <br />
              <Link to="/create-transaction" className="btn btn-success">
                Create Transaction
              </Link>
            </div>
          </div>

          {/* Food Management Card */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <i className="bi bi-cloud-fog-fill display-1 text-primary mb-3"></i>
              <h4>Manage Foods</h4>
              <p>Easily view, edit, and delete food items in the food list.</p>
              <Link to="/foods" className="btn btn-primary">
                View Foods
              </Link>
              <br />
              <Link to="/create-food" className="btn btn-success">
                Create Food
              </Link>
            </div>
          </div>

          {/* Customer Management Card */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <i className="bi bi-people-fill display-1 text-primary mb-3"></i>
              <h4>Manage Customers</h4>
              <p>Easily view, edit, and delete customer items in the customers list.</p>
              <Link to="/customers" className="btn btn-primary">
                View Customers
              </Link>
              <br />
              <Link to="/create-customers" className="btn btn-success">
                Create Customers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
